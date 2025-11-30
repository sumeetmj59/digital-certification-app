export const generateCertificateImage = async ({ name, grade, capabilities, backgroundImage }) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = backgroundImage;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Name
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(name, 600, 430);

      // Grade
      ctx.font = '32px Arial';
      ctx.fillText(`Grade: ${grade}`, 600, 500);

      // Capabilities
      ctx.font = '28px Arial';
      capabilities.forEach((cap, idx) => {
        ctx.fillText(`• ${cap}`, 600, 560 + idx * 40);
      });

      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    };
  });
};