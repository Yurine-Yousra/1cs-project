export const bytesToBase64 = (bytes: Uint8Array): string => {
    let binary = '';
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return btoa(binary);
  };



 export  const imageUrlToBytes = async (url: string): Promise<Uint8Array> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };



