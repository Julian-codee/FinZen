interface TotalBalanceProps {
  visible: boolean;
  amount: number;
}

const TotalBalance = ({ visible, amount }: TotalBalanceProps) => {
  const formattedAmount = `$${amount.toLocaleString('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <p className="text-sm text-gray-300">
      Saldo total:{' '}
      <span className="font-semibold text-white">
        {visible ? formattedAmount : '•••••••'}
      </span>
    </p>
  );
};

export default TotalBalance;
