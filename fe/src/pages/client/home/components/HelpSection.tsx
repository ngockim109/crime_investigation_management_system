import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HELP_ICONS, HELP_TEXTS } from '@/constants/home.constants';


const HelpSection: React.FC = () => {
    const navigate = useNavigate();
    return (
        <section className=" mx-auto my-8 text-center">
            <h2 className="text-4xl font-bold my-16">How You Can Help?</h2>

            <div className="flex flex-wrap justify-center gap-16 cursor-pointer">
                {HELP_TEXTS.map((text, index) => (
                    <div key={index} className="flex flex-col items-center gap-12 max-w-xs">
                        <img src={HELP_ICONS[index]} alt={`Icon ${index + 1}`} className="w-20 h-20" />
                        <p className="text-gray-700 text-xl">{text}</p>
                    </div>
                ))}
            </div>

            <button
                className="my-16 !bg-[#005DB9] hover:bg-blue-700 text-white hover:text-white text-2xl font-semibold px-8 py-4 h-16 w-3xs rounded-2xl"
                onClick={() => navigate('/reports')}
            >
                File A Report
            </button>

        </section>
    );
};

export default HelpSection;
