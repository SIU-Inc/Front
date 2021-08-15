import Maps from '../components/Maps';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Paragraph from "@material-tailwind/react/Paragraph";

export default function Home() {
    return (
        <>                    
        <div className="bg-light-blue-500 pt-5 pb-28 px-3 md:px-8 h-auto">
        </div>
            <div className="px-3 md:px-8 h-auto -mt-24">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 px-4 mb-16">
                        <div className="px-4 mb-10">
                            <Card>
                                <CardHeader color="purple">
                                    <h2>¿Qué es LoRa?</h2>
                                </CardHeader>
                                <CardBody>
                                <Paragraph>
                                Según (The Things Network, 2021) LoRa es una técnica de modulación inalámbrica derivada de la tecnología Chirp Spread Spectrum (CSS). Codifica la información en las ondas de radio mediante pulsos chirp, de forma similar a como se comunican los delfines y los murciélagos. La transmisión modulada por LoRa es robusta frente a las perturbaciones y puede recibirse a grandes distancias.
LoRa es ideal para aplicaciones que transmiten pequeños trozos de datos con bajas tasas de bits. 
                                </Paragraph>
                                

                                </CardBody>
                            </Card>
                        </div>
                        <div className="px-4 mb-10">
                            <Card>
                                <CardHeader color="purple">
                                    <h2>¿Qué es LoRaWAN?</h2>
                                </CardHeader>
                                <CardBody>
                                <Paragraph>
                                Según (The Things Network, 2021) LoRaWAN es un protocolo de capa de control de acceso al medio (MAC) construido sobre la modulación LoRa. Es una capa de software que define cómo los dispositivos utilizan el hardware LoRa, por ejemplo, cuándo transmiten y el formato de los mensajes. El protocolo LoRaWAN es desarrollado y mantenido por la LoRa Alliance. La primera especificación de LoRaWAN se publicó en enero de 2015.
                                </Paragraph>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className="px-3 md:px-8 h-auto -mt-28 mb-16">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 px-4 h-[600px]">
                        <Maps />
                    </div>
                </div>
        </div>
        </>
    );
}
