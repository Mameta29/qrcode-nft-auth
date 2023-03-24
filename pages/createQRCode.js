import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

function generateQRCodeUrl(tokenId) {
  const qrCodeData = `https://example.com/?tokenId=${tokenId}`; // トークンIDを含むURL
  const qrCodeSize = 200; // QRコードのサイズ
  const qrCodeErrorCorrectionLevel = 'H'; // QRコードのエラー訂正レベル

  const canvas = document.createElement('canvas');
  QRCode.toCanvas(canvas, qrCodeData, {
    width: qrCodeSize,
    height: qrCodeSize,
    color: {
      dark: '#000000',
      light: '#ffffff',
    },
    errorCorrectionLevel: qrCodeErrorCorrectionLevel,
  });

  // QRコードをデータURIに変換する
  const dataUrl = canvas.toDataURL();

  return dataUrl;
}

export default function QRCodePage() {
  const [qrCodeUrl, setQRCodeUrl] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [inputId, setInputId] = useState('');
  const router = useRouter();
  const handleChange = (e) => {
    setInputId(e.target.value);
  };

  const handleClick = () => {
    setTokenId(inputId);
  };
  // トークンIDを設定する
  //   const tokenId = 10;

  const buttonClickToCreate = () => {
    router.push('/');
  };

  useEffect(() => {
    // QRコードのデータURIを生成する
    const url = generateQRCodeUrl(tokenId);

    // QRコードのデータURIを設定する
    setQRCodeUrl(url);
  }, [tokenId]);

  return (
    <>
      <div>
        <input type="text" value={inputId} onChange={handleChange} />
        <button onClick={handleClick}>tokenIdをセットする</button>
        <p>tokenId : {tokenId}</p>
        {qrCodeUrl && <img src={qrCodeUrl} alt="QR code" />}
      </div>
      <button onClick={buttonClickToCreate}>homeに戻る</button>
    </>
  );
}
