// src/utils/uploadToNFTStorage.js
import { NFTStorage, File } from 'nft.storage';

const API_KEY = import.meta.env.VITE_NFT_STORAGE_API;

export const uploadToNFTStorage = async (certData) => {
  const client = new NFTStorage({ token: API_KEY });

  const imageBlob = await (await fetch(certData.image)).blob();
  const imageFile = new File([imageBlob], 'certificate.png', { type: 'image/png' });

  const metadata = await client.store({
    name: certData.name,
    description: certData.description,
    image: imageFile,
    properties: {
      grade: certData.grade,
      capabilities: certData.capabilities,
      issued: new Date().toISOString()
    }
  });

  return metadata.url; // this is the IPFS url: ipfs://...
};