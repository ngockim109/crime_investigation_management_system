import React from 'react';
import { PROGRAMS } from '@/constants/home.constants';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ProgramsGrid: React.FC = () => {
    return (
        <section className="w-full mx-auto my-8 px-4 ">
            <h2 className="text-4xl font-bold mb-8 text-center border-t pt-24 border-gray-200 ">Programs and Resources</h2>
            <div className="flex flex-wrap justify-center gap-20 cursor-pointer">
                {PROGRAMS.map((program, index) => (
                    <Card
                        key={index}
                        className="w-full max-w-96 text-center"
                    >
                        <CardHeader className='gap-8'>
                            <img
                                src={program.image}
                                alt={program.title}
                                className="mx-auto mb-4 object-cover rounded h-full w-full"
                            />
                            <CardTitle className="text-2xl text-[#005DB9] font-bold">{program.title}</CardTitle>
                            <CardDescription className="text-[16px]">{program.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default ProgramsGrid;
