import { useRouter } from 'next/router';

export default function Success() {
  const router = useRouter();
  const buttonClickToCreate = () => {
    router.push('/');
  };
  return (
    <div>
      <h1>成功</h1>
      <p>あなたはNFTの所有者です。</p>
      <button onClick={buttonClickToCreate}>homeに戻る</button>
    </div>
  );
}
