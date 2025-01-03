import React from 'react';
import ContentLoader from 'react-content-loader';

export default function SkeletonPost() {
  return (
    <ContentLoader
      speed={2}
      width={385}
      height={300}
      viewBox="0 0 385 300"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      {/* Прямоугольник для изображения */}
      <rect x="0" y="0" rx="7" ry="7" width="385" height="200" />
      {/* Прямоугольник для категории */}
      <rect x="10" y="220" rx="4" ry="4" width="80" height="15" />
      {/* Прямоугольник для заголовка */}
      <rect x="10" y="245" rx="4" ry="4" width="200" height="20" />
      {/* Прямоугольник для даты */}
      <rect x="10" y="275" rx="4" ry="4" width="150" height="15" />
    </ContentLoader>
  );
}
