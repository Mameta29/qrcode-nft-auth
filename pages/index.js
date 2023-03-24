import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// import { QrReader } from 'react-qr-reader';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import {
  nftContractAddress,
  nftContractAbi,
  userAddress,
} from '../utils/contractInfo';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });
// NFTコントラクトのアドレスとABIを設定
// const nftContractAddress = '0x2953399124F0cBB46d2CbACD8A89cF0599974963';
// const nftContractAbi = []; // この配列にコントラクトのABIを入れてください
// const userAddress = '';
// const tokenId = '1';

export default function Home() {
  const [qrResult, setQrResult] = useState(null);
  // const [isNftOwner, setIsNftOwner] = useState(false);
  const router = useRouter();
  const [showQrReader, setShowQrReader] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  console.log(nftContractAddress, userAddress);

  const handleScan = (qrData) => {
    if (qrData) {
      // QR コードから tokenId を抽出する
      setQrResult(qrData);
      const urlSearchParams = new URLSearchParams(new URL(qrData).search);
      const extractedTokenId = urlSearchParams.get('tokenId');

      if (extractedTokenId) {
        setTokenId(extractedTokenId);
      } else {
        console.error('tokenId not found in QR code data');
      }
    }

    // if (data) {
    //   setQrResult(data);
    // }
    // else if (showQrReader) {
    //   setShowQrReader(false);
    //   setTimeout(() => setShowQrReader(true), 1000);
    // }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleButtonClick = () => {
    setShowQrReader(!showQrReader);
  };

  const buttonClickToCreate = () => {
    router.push('/createQRCode');
  };

  // erc721実装 -> ownerOfから所有者のアドレスをとってくる
  const checkNftOwnershipERC721 = async (qrTokenId, userAddress) => {
    // const { qrCodeNftAddress, qrCodeTokenId } = nftData;
    const tokenId = parseInt(qrTokenId);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const contractCode = await provider.getCode(nftContractAddress);
    console.log('contractCode:', contractCode);
    console.log('Connected network:', network);
    const contract = new ethers.Contract(
      nftContractAddress,
      nftContractAbi,
      provider
    );

    try {
      const owner = await contract.ownerOf(tokenId);
      if (owner.toLowerCase() === userAddress.toLowerCase()) {
        // setIsNftOwner(true);
        router.push('/success');
      } else {
        // setIsNftOwner(false);
        router.push('/failure');
      }
    } catch (err) {
      console.error(err);
      // setIsNftOwner(false);
      router.push('/failure');
    }
  };

  // // erc1155実装 -> ownerOfから所有者のアドレスをとってくる
  // const check1155NftOwnership = async (nftData) => {
  //   const { qrCodeNftAddress, qrCodeTokenId } = nftData;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const contract = new ethers.Contract(
  //     nftContractAddress,
  //     nftContractAbi,
  //     provider
  //   );
  //   const tokenId = 1; // ここで確認するNFTのトークンIDを設定

  //   try {
  //     const owner = await contract.ownerOf(tokenId);
  //     if (owner.toLowerCase() === address.toLowerCase()) {
  //       setIsNftOwner(true);
  //       // router.push('/success');
  //     } else {
  //       setIsNftOwner(false);
  //       // router.push('/failure');
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setIsNftOwner(false);
  //     // router.push('/failure');
  //   }
  // };

  useEffect(() => {
    if (tokenId) {
      checkNftOwnershipERC721(tokenId, userAddress);
    }
  }, [tokenId]);

  return (
    <div>
      <h1>QRコードリーダー</h1>
      <button onClick={buttonClickToCreate}>QRコードを作成する</button>
      <br />
      <button onClick={handleButtonClick}>
        {' '}
        {showQrReader ? 'QRコードリーダーを閉じる' : 'NFTを利用する'}
      </button>
      {showQrReader && (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '70%' }}
          // facingMode="environment" // この行を追加
          // legacyMode // この行を追加
        />
      )}
      <p>
        {qrResult
          ? `QRコードのデータ: ${qrResult}`
          : 'QRコードをスキャンしてください'}
      </p>
      {/* <p>
        {isNftOwner
          ? 'このアドレスは指定されたNFTの所有者です'
          : 'このアドレスは指定されたNFTの所有者ではありません'}
      </p> */}
    </div>
  );
}
