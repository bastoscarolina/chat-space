import {Box, Button, Text, TextField, Image} from '@skynexui/components';
import appConfig from "../config.json";

export default function Error(){
    return (
        <>
            <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            }}
            >
                <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: {
                      xs: 'column',
                      sm: 'column',
                    },
                    width: '100%', maxWidth: '700px',
                    borderRadius: '5px', padding: '32px', margin: '16px',
                  }}
                >
                    <Text variant="heading3" 
                    styleSheet={{ 
                        marginBottom: '16px', 
                        color: appConfig.theme.colors.neutrals["000"],
                        textAlign: 'center',
                        fontFamily: 'Roboto',
                    }}>
                        Algo de errado no fluxo espaço-temporal e não foi possível encontrar seu destino :(
                    </Text>
                    <Image
                    styleSheet={{
                    marginBottom: '16px',
                    }}
                    src={"https://static.wikia.nocookie.net/vm-doctor-who/images/c/cd/Doctor-who-tardis-png.png"}
                    />
                </Box>
            </Box>
        </>
    )
}