import { useRouter } from 'next/router';

export default function Failure() {
  const router = useRouter();
  const buttonClickToCreate = () => {
    router.push('/');
  };
  return (
    <div>
      <h1>失敗</h1>
      <p>このアドレスは指定されたNFTの所有者ではありません。</p>
      <button onClick={buttonClickToCreate}>homeに戻る</button>
    </div>
  );
}
