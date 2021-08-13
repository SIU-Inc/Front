import StatusCard from '../components/StatusCard';
import ChartData from '../components/ChartData';

export default function Dashboard() {

    return (
        <>
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            color="green"
                            icon="places"
                            title="Posiciones"
                            amount="4"
                            percentageIcon="places"
                            percentageColor="green"
                            date="UCA"
                        />
                        <StatusCard
                            
                            color="orange"
                            icon="places"
                            title="Muestras"
                            amount="415"
                            percentageIcon="date_range"
                            percentageColor="orange"
                            date="23/07/2021"
                        />
                        <StatusCard
                            color="pink"
                            icon="data_usage"
                            title="Sensores"
                            amount="2"
                            percentageIcon="emoji_objects"
                            percentageColor="orange"
                            date="Temperatura y Humedad"
                        />
                    </div>
                </div>
            </div>
            <div className="px-3 md:px-8 -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 mb-16">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <ChartData />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
