// import { ReactComponent as MapSvg } from '/src/assets/map.svg?react';
import MapSvg from '/src/assets/map.svg?react';

export default function StoreMap() {
  return (
    <div style={{ position: 'relative' }}>
      <MapSvg style={{ width: '100%', height: 'auto' }} />
      <div
        style={{
          position: 'absolute',
          top: '150px',
          left: '300px',
          width: '15px',
          height: '15px',
          backgroundColor: 'red',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}