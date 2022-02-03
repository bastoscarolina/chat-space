import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image, Icon } from "@skynexui/components";
import React from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { ButtonSendSticker } from "../src/components/ButtonSendSticker";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzgzNDA4MywiZXhwIjoxOTU5NDEwMDgzfQ.PJqeLKsAzDwbKvUTjv9vPqhuxEf_nzuRf9juYJ47JVI";

const SUPABASE_URL = "https://enzylsklxajplbkkmnae.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagensTempoReal(adicionaMensagem) {
  return supabaseClient
    .from("mensagens")
    .on("INSERT", (respostaLive) => {
      //console.log('aoba')
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}

export default function Chat() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaMensagens, setListaMensagens] = React.useState([
    // {
    //   id: 1,
    //   de: 'bastoscarolina',
    //   texto: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_1.png',
    // }
  ]);
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;

  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .order("id", { ascending: false })
      .then(({ data }) => {
        setListaMensagens(data);
      });

      const inscricao = escutaMensagensTempoReal((novaMensagem) => {
      setListaMensagens((valorAtual) => {
        return [novaMensagem, ...valorAtual];
      });
    });
    return () => {
      inscricao.unsubscribe();
    }

  }, []);

  function handleNovaMensagem(novaMensagem) {
    //depois de criar a funcionalidade estatica, voce consegue "plugar" o backend depois
    const mensagem = {
      //id: listaMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        console.log(data);
      });
    setMensagem("");
  }

  

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            {/* lista de Mensagens: {listaMensagens.map((mensagemAtual)=>{
                            return(
                                <li key={mensagemAtual.id}>
                                    {mensagemAtual.de} : {mensagemAtual.texto}
                                </li>
                            )
                        })} */}
            <MessageList mensagens={listaMensagens}  />

            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                value={mensagem}
                onChange={(event) => {
                  const valor = event.target.value;
                  setMensagem(valor);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleNovaMensagem(mensagem);
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: "100%",
                  border: "0",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: "12px",
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  //console.log("salva esse sticker mano");
                  handleNovaMensagem(":sticker:" + sticker);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          variant="heading5"
          styleSheet={{ color: appConfig.theme.colors.neutrals["000"] }}
        >
          Chat
        </Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  console.log("MessageList", props);
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals["000"],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals["000"],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
    
            </Box>
            {mensagem.texto.startsWith(":sticker:") ? (
              <Image src={mensagem.texto.replace(":sticker:", "")} />
            ) : (
              mensagem.texto
            )}
            {/* {mensagem.texto} */}
          </Text>
        );
      })}
    </Box>
  );
}
