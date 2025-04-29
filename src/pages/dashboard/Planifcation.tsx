import React, { useEffect, useState } from 'react';
import { fetchNaturePhotos, UnsplashPhoto } from '../../apis/uplash.api';
import toast from 'react-hot-toast';


const Planifcation: React.FC = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  

  useEffect(() => {
    const fetchPhotos = async () => {
        try {
            const data = await fetchNaturePhotos(1, 2);
            setPhotos(data);

        } catch (error) {
            toast.error('Failed to fetch photos');
        }
    };

    fetchPhotos();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Nature Gallery</h1>
     
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {photos.map(photo => (
          <div key={photo.id}>
            <img
              src={photo.urls.raw}
              alt={photo.alt_description || 'Nature photo'}
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planifcation;
