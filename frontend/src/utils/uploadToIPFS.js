import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_KEY = 'YOUR_NFT_STORAGE_API_KEY'; // 🔑 Replace with your actual key

const client = new NFTStorage({ token: NFT_STORAGE_KEY });

export const uploadToIPFS = async (certificate) => {
  const { name, description, image } = certificate;

  const metadata = await client.store({
    name,
    description,
    image: await fetchImageAsFile(image, `${name}_certificate.png`),
  });

  return metadata.url; // returns ipfs://... URL
};

const fetchImageAsFile = async (url, filename) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
};