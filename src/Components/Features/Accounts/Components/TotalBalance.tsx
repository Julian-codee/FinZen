interface TotalBalanceProps {
  visible: boolean;
  amount: string;
}

const TotalBalance = ({ visible, amount }: TotalBalanceProps) => (
  <p className="text-sm text-gray-300">
    Saldo total: <span className="font-semibold text-white">{visible ? `$${amount}` : '•••••••'}</span>
  </p>
);

export default TotalBalance;
