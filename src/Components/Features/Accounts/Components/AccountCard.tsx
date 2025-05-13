import {ReactNode} from 'react';

interface AccountCardProps {
    title:string,
    amount:string,
    description:string,
    icon:ReactNode;
    textColor?:string;
}

const AccountCard = ({ title, amount, description, icon, textColor = 'text-white' } : AccountCardProps) => (
    <div className="border border-white/20 p-4 rounded-lg w-60 text-white shadow flex flex-col gap-2">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-sm text-white font-medium">{title}</h3>
                <div className={`text-2xl font-bold ${textColor}`}>{amount}</div>
                <p className="text-gray-400 text-sm">{description}</p>
            </div>
            <div className="bg-[#1f2937] p-2 rounded-full">
                {icon}
            </div>
        </div>
    </div>
);

export default AccountCard;