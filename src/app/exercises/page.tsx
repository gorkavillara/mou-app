'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  FilesetResolver,
  HandLandmarker,
  HandLandmarkerResult
} from '@mediapipe/tasks-vision';
import { DashboardHeader } from '@/components/exercises/DashboardHeader';
import { MetricsGrid } from '@/components/exercises/MetricsGrid';
import { Home, Activity, Calendar, User } from 'lucide-react';
import Link from 'next/link';

type Metrics = {
  rom: number;
  maxFlexion: number;
  maxExtension: number;
  repetitions: number;
  elapsedTime: number;
  progress: number;
};

export default function Exercises() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Metrics>({
    rom: 0,
    maxFlexion: 0,
    maxExtension: 0,
    repetitions: 0,
    elapsedTime: 0,
    progress: 0
  });

  // Track wrist angle history for repetition counting
  const angleHistoryRef = useRef<number[]>([]);
  const lastDirectionRef = useRef<'up' | 'down' | null>(null);
  const repCountRef = useRef(0);
  const lastTimestampRef = useRef<number>(0);

  function calculateWristAngle(
    landmarks: {
      x: number;
      y: number;
      z: number;
    }[]
  ): number {
    const wrist = landmarks[0];
    const middleMcp = landmarks[9];
    const middleTip = landmarks[12];

    const v1 = {
      x: middleMcp.x - wrist.x,
      y: middleMcp.y - wrist.y
    };
    const v2 = {
      x: middleTip.x - middleMcp.x,
      y: middleTip.y - middleMcp.y
    };

    const dot = v1.x * v2.x + v1.y * v2.y;
    const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
    const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

    if (mag1 === 0 || mag2 === 0) return 0;

    const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
    const angle = Math.acos(cosAngle) * (180 / Math.PI);

    const cross = v1.x * v2.y - v1.y * v2.x;
    return cross > 0 ? angle : -angle;
  }

  function countRepetitions(angle: number) {
    angleHistoryRef.current.push(angle);
    if (angleHistoryRef.current.length > 10) {
      angleHistoryRef.current.shift();
    }

    if (angleHistoryRef.current.length < 5) return;

    const avg =
      angleHistoryRef.current.reduce((a, b) => a + b, 0) /
      angleHistoryRef.current.length;

    const threshold = 15;

    if (avg > threshold && lastDirectionRef.current !== 'up') {
      if (lastDirectionRef.current === 'down') {
        repCountRef.current++;
      }
      lastDirectionRef.current = 'up';
    } else if (avg < -threshold && lastDirectionRef.current !== 'down') {
      lastDirectionRef.current = 'down';
    }
  }

  function drawHandLandmarks(
    ctx: CanvasRenderingContext2D,
    landmarks: {
      x: number;
      y: number;
      z: number;
    }[],
    width: number,
    height: number
  ) {
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],
      [0, 5], [5, 6], [6, 7], [7, 8],
      [0, 9], [9, 10], [10, 11], [11, 12],
      [0, 13], [13, 14], [14, 15], [15, 16],
      [0, 17], [17, 18], [18, 19], [19, 20],
      [5, 9], [9, 13], [13, 17]
    ];

    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    connections.forEach(([start, end]) => {
      const startPoint = landmarks[start];
      const endPoint = landmarks[end];
      ctx.beginPath();
      ctx.moveTo(startPoint.x * width, startPoint.y * height);
      ctx.lineTo(endPoint.x * width, endPoint.y * height);
      ctx.stroke();
    });

    landmarks.forEach((landmark, index) => {
      const x = landmark.x * width;
      const y = landmark.y * height;
      ctx.beginPath();
      ctx.arc(x, y, index === 0 ? 8 : 5, 0, 2 * Math.PI);
      ctx.fillStyle = index === 0 ? '#10B981' : '#60A5FA';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }
  const detectHands = useCallback(() => {
    const step = () => {
      if (!videoRef.current || !canvasRef.current || !handLandmarkerRef.current) {
        animationFrameRef.current = requestAnimationFrame(step);
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx || video.readyState !== 4) {
        animationFrameRef.current = requestAnimationFrame(step);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      let ts = Math.floor(video.currentTime * 1000);
      if (ts <= lastTimestampRef.current) {
        ts = lastTimestampRef.current + 1;
      }
      lastTimestampRef.current = ts;

      const results: HandLandmarkerResult =
        handLandmarkerRef.current.detectForVideo(video, ts);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];

        drawHandLandmarks(ctx, landmarks, canvas.width, canvas.height);

        const angle = calculateWristAngle(landmarks);
        countRepetitions(angle);

        setMetrics((prev) => {
          const newMaxFlexion =
            angle > 0 ?
            Math.max(prev.maxFlexion, Math.round(angle)) :
            prev.maxFlexion;
          const newMaxExtension =
            angle < 0 ?
            Math.max(prev.maxExtension, Math.round(Math.abs(angle))) :
            prev.maxExtension;
          const newRom = newMaxFlexion + newMaxExtension;
          const targetReps = 10;
          const newProgress = Math.min(
            100,
            Math.round(repCountRef.current / targetReps * 100)
          );

          return {
            ...prev,
            rom: newRom,
            maxFlexion: newMaxFlexion,
            maxExtension: newMaxExtension,
            repetitions: repCountRef.current,
            progress: newProgress
          };
        });
      }

      animationFrameRef.current = requestAnimationFrame(step);
    };
    step();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const videoEl = videoRef.current;

    async function initializeHandTracking() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.32/wasm'
        );

        let handLandmarker: HandLandmarker;
        try {
          handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
              delegate: 'GPU'
            },
            runningMode: 'VIDEO',
            numHands: 1
          });
        } catch {
          handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath:
                'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
              delegate: 'CPU'
            },
            runningMode: 'VIDEO',
            numHands: 1
          });
        }

        if (!isMounted) return;

        handLandmarkerRef.current = handLandmarker;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: 640,
            height: 480
          }
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setIsLoading(false);
          startTimeRef.current = Date.now();
          detectHands();
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ?
            err.message :
            'Failed to initialize hand tracking'
          );
          setIsLoading(false);
        }
      }
    }

    initializeHandTracking();

    return () => {
      isMounted = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoEl?.srcObject) {
        const stream = videoEl.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [detectHands]);

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setMetrics((prev) => ({
        ...prev,
        elapsedTime: elapsed
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader
        exerciseName="Flexión de Muñeca"
        dayInfo="Día 3"
        phaseInfo="Fase Inicial" />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full pb-20">
        {/* Camera Section - 50% height */}
        <div className="relative bg-gray-900 flex-1 min-h-[50vh]">
          {isLoading &&
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Iniciando cámara...</p>
              </div>
            </div>
          }

          {error &&
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-red-500 text-xl">!</span>
                </div>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          }

          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
              style={{
                transform: 'scaleX(-1)'
              }} />

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                transform: 'scaleX(-1)'
              }} />

            {/* Tracking status indicator */}
            {!isLoading && !error &&
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-white text-xs font-medium">
                  Tracking activo
                </span>
              </div>
            }
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="bg-gray-50 border-t border-gray-200">
          <MetricsGrid
            rom={metrics.rom}
            maxFlexion={metrics.maxFlexion}
            maxExtension={metrics.maxExtension}
            repetitions={metrics.repetitions}
            elapsedTime={metrics.elapsedTime}
            progress={metrics.progress} />
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-gray-200 pb-safe pt-2 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center px-4 h-16">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Home size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">Inicio</span>
          </Link>
          <Link href="/exercises" className="flex flex-col items-center gap-1 text-blue-600">
            <Activity size={24} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">Ejercicios</span>
          </Link>
          <Link href="/report" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Calendar size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">Informe</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
            <User size={24} strokeWidth={2} />
            <span className="text-[10px] font-medium">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
