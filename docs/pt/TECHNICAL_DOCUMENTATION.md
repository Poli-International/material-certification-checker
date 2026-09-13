# Descodificador de Certificação de Materiais: Arquitetura Técnica (Português)

## Índice

1. [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
2. [Organização do Sistema de Ficheiros](#organização-do-sistema-de-ficheiros)
3. [Subsistemas e Componentes](#subsistemas-e-componentes)
   - [Leitor de Certificados e Analisador de Texto](#1-leitor-de-certificados-e-analisador-de-texto)
   - [Gerador de Questionários Técnicos para Fornecedores](#2-gerador-de-questionários-técnicos-para-fornecedores)
   - [Matriz Alegações / Comprovativos](#3-matriz-alegações--comprovativos)
   - [Comparador Lado a Lado de Materiais Certificados](#4-comparador-lado-a-lado-de-materiais-certificados)
   - [Cofre de Receção e Conformidade do Estúdio](#5-cofre-de-receção-e-conformidade-do-estúdio)
   - [Biblioteca de Normas Regulamentares](#6-biblioteca-de-normas-regulamentares)
   - [Misturador de Compatibilidade Galvânica e Química](#7-misturador-de-compatibilidade-galvânica-e-química)
   - [Manual de Assepsia e Esterilização no Estúdio](#8-manual-de-assepsia-e-esterilização-no-estúdio)
4. [Esquemas e Estruturas de Dados](#esquemas-e-estruturas-de-dados)
5. [Lógica Clínica de Avaliação da Biocompatibilidade](#lógica-clínica-de-avaliação-da-biocompatibilidade)
6. [Motor de Internacionalização (I18N)](#motor-de-internacionalização-i18n)
7. [Acessibilidade, Design Responsivo e Motor de Impressão](#acessibilidade-design-responsivo-e-motor-de-impressão)
8. [Verificação Automatizada e Controlo de Qualidade](#verificação-automatizada-e-controlo-de-qualidade)

---

## Visão Geral da Arquitetura

O **Descodificador de Certificação de Materiais** foi concebido como uma aplicação web estática de alto desempenho, sem dependências externas e executada integralmente no navegador do utilizador. Não requer servidores de processamento remoto, bases de dados na nuvem nem redes de distribuição de conteúdos (CDNs). Todos os procedimentos de análise de texto, verificação clínica e renderização de ecrã ocorrem localmente no cliente.

### Princípios de Arquitetura Fundamentais
- **Privacidade Absoluta dos Dados**: Faturas, certificados de fundição e relatórios de controlo de receção são guardados exclusivamente no `localStorage` local.
- **Zero Dependências Remotas**: Tipografias, folhas de estilo, scripts e recursos gráficos são carregados através de caminhos relativos locais.
- **Carregamento Instantâneo**: Inicialização imediata sem pedidos de rede bloqueadores.
- **Operação Offline Completa**: Funcionalidade garantida em estúdios de body piercing mesmo perante falhas ou ausência de internet.

### Tecnologias Principais
- **HTML5**: Estrutura semântica dotada de marcas ARIA, papéis de acessibilidade e controlo rigoroso de foco de teclado.
- **CSS3**: Variáveis de design padronizadas, grelhas adaptativas em CSS Grid e Flexbox, e regras específicas para impressão em papel.
- **JavaScript Moderno (ES6+)**: Módulos IIFE (Immediately Invoked Function Expressions) independentes associados ao objeto global `window`.
- **Armazenamento no Cliente**: Serialização JSON através da API `localStorage` para arquivo de auditorias e inspeções de encomendas.

---

## Organização do Sistema de Ficheiros

```
material-certification-checker/
├── index.html                     # Ponto de entrada principal da aplicação
├── documentation.html             # Documentação técnica e glossário de normas
├── embed.html                     # Gerador de código para integração por iframe
├── css/
│   └── style.css                  # Folhas de estilo unificadas, layout e regras de impressão
├── images/
│   └── Poli-International-Co.webp # Imagem institucional da marca
├── js/
│   ├── i18n.js                    # Gestor central I18N e dicionário base em inglês
│   ├── i18n/                      # Dicionários traduzidos (paridade absoluta de chaves)
│   │   ├── fr.js                  # Francês
│   │   ├── de.js                  # Alemão
│   │   ├── it.js                  # Italiano
│   │   ├── es.js                  # Espanhol
│   │   ├── pt.js                  # Português
│   │   └── nl.js                  # Neerlandês
│   ├── certification-data.js      # Catálogo de normas técnicas (ASTM, ISO, USP, EN)
│   ├── material-data.js           # Fichas físicas, químicas e de biocompatibilidade
│   ├── v2-data.js                 # Frases de teste, questionários e matriz de evidências
│   ├── v2-features.js             # Leitor de certificados, questionários, comparador
│   ├── library.js                 # Motor de pesquisa do catálogo de normas
│   ├── mixer.js                   # Análise de corrosão galvânica e compatibilidade
│   ├── reference-studio.js        # Procedimentos de esterilização em autoclave e assepsia
│   ├── studio-vault.js            # Registo local de receção e conformidade
│   ├── decoder.js                 # Controladores de pesquisa e glossário
│   └── common.js                  # Comutador de tema, janelas modais e mensagens iframe
└── docs/                          # Documentação multilingue em 7 idiomas
    ├── en/TECHNICAL_DOCUMENTATION.md
    ├── fr/TECHNICAL_DOCUMENTATION.md
    ├── de/TECHNICAL_DOCUMENTATION.md
    ├── it/TECHNICAL_DOCUMENTATION.md
    ├── es/TECHNICAL_DOCUMENTATION.md
    ├── pt/TECHNICAL_DOCUMENTATION.md
    └── nl/TECHNICAL_DOCUMENTATION.md
```

---

## Subsistemas e Componentes

### 1. Leitor de Certificados e Analisador de Texto
**Ficheiro:** `js/v2-features.js`
Inspeciona texto livre de faturas comerciais, descrições de produtos e certificados de análise metalúrgica (MTC):
- **Deteção de Padrões**: Expressões regulares identificam códigos de normas (ASTM F136, ASTM F138, ISO 5832-3, USP Classe VI), processos de refusão (ELI / Extra Low Interstitial, VAR), símbolos de elementos químicos e alegações comerciais vagas.
- **Classificação por Nível de Biocompatibilidade**:
  - `tier-compliant`: Especificação médica válida para implantes cirúrgicos (ex. Titânio ASTM F136, Aço ASTM F138, polímero médico biocompatível BioFlex).
  - `tier-caution`: Ligas de grau industrial ou impróprias para implantação (ex. 316L comum sem refusão a vácuo, G23 sem menção expressa à norma ASTM F136, acrílicos PMMA).
  - `tier-unverified`: Frases publicitárias desprovidas de dados técnicos ("hipoalergénico", "aço cirúrgico", "metal puro").
- **Exemplos Rápidos**: Seleção interativa de frases típicas de fornecedores para demonstração imediata do diagnóstico do sistema.

### 2. Gerador de Questionários Técnicos para Fornecedores
**Ficheiro:** `js/v2-features.js`
Gera uma folha de auditoria técnica orientada ao material selecionado e ao tecido onde será colocado:
- **Contexto Tecidual de Aplicação**: Distingue a perfuração inicial (ferida aberta em cicatrização que exige materiais sem libertação de substâncias tóxicas) do uso em perfurações cicatrizadas e mucosas orais.
- **Critérios Obrigatórios de Receção**: Exige rastreabilidade de lote e corrida, limites de rugosidade superficial (Ra <= 0,05 µm / polimento espelhado) e comprovação de passivação.
- **Questões Técnicas Rigorosas**: Formula entre 4 e 6 perguntas direcionadas, com indicação da resposta satisfatória aceitável em oposição a respostas de alerta ou rejeição.
- **Impressão e Assinatura**: Apresentação pronta a imprimir com campos de validação manual para inclusão no dossiê de qualidade do estúdio.

### 3. Matriz Alegações / Comprovativos
**Ficheiro:** `js/v2-features.js` e `js/v2-data.js`
Tabela interativa que faz corresponder 12 alegações comerciais habituais aos documentos oficiais indispensáveis:
- **Categorias**: Metais, Polímeros e Alegações Gerais de qualidade.
- **Documentos Obrigatórios**: Especifica a exigência de certificado de corrida MTC, espetrometria de emissão ótica, ensaio de citotoxicidade ISO 10993-5 ou conformidade USP Classe VI.
- **Avaliação de Risco na Ausência de Prova**: Explica os perigos clínicos decorrentes da falta de documentação comprovativa.
- **Filtros e Procura Instantânea**: Seleção por categoria e pesquisa de texto imediata em todos os idiomas.

### 4. Comparador Lado a Lado de Materiais Certificados
**Ficheiro:** `js/v2-features.js`
Ferramenta para análise simultânea de dois ou três materiais:
- **Parâmetros Avaliados**: Limites de composição garantida, ensaios de biocompatibilidade, taxa limite de libertação de níquel (EN 1811), resistência ao autoclave, acabamento de superfície e recomendação clínica.
- **Alertas Intercategorias**: Salienta as propriedades microbiológicas e estruturais ao comparar metais cirúrgicos com polímeros biocompatíveis.

### 5. Cofre de Receção e Conformidade do Estúdio
**Ficheiro:** `js/studio-vault.js`
Base de registo local para auditoria de encomendas de joalharia recebidas:
- **Campos Arquivados**: Nome do fornecedor, número do lote ou fatura, classe do material, parecer de conformidade e notas do avaliador.
- **Armazenamento**: API `localStorage` do navegador, com prevenção de erros e sem qualquer comunicação com entidades externas.
- **Opções de Gestão**: Consulta de histórico, eliminação de entradas, impressão de sumários e exportação/importação de cópias de segurança em JSON.

### 6. Biblioteca de Normas Regulamentares
**Ficheiro:** `js/library.js` e `js/certification-data.js`
Catálogo pesquisável com resumos e critérios fundamentais de normas técnicas da ASTM International, ISO, USP e diretivas europeias (EN).

### 7. Misturador de Compatibilidade Galvânica e Química
**Ficheiro:** `js/mixer.js`
Avalia as diferenças de potencial elétrico entre peças de joalharia em contacto (hastes, topos roscados, esferas) expostas a eletrólitos corporais humanos (saliva, suor, sangue).

### 8. Manual de Assepsia e Esterilização no Estúdio
**Ficheiro:** `js/reference-studio.js`
Indicações clínicas relativas a ciclos de autoclave a vapor saturado (121°C a 134°C), ultrassons, banhos de desinfeção e limites térmicos de cada material.

---

## Esquemas e Estruturas de Dados

### Modelo de Norma Regulamentar (`js/certification-data.js`)
```javascript
{
  id: "astm_f136",
  code: "ASTM F136",
  organization: "ASTM International",
  title: "Especificação padrão para titânio-6alumínio-4vanádio ELI forjado para aplicações em implantes cirúrgicos",
  scope: "Perfuração inicial, contacto tecidual prolongado, dispositivos médicos implantáveis",
  implant_certified: true,
  nickel_content: "< 0,01% (Não detetável)",
  autoclave_compatible: true,
  key_requirements: [
    "Grau ELI (Extra Low Interstitial)",
    "Resistência à tração >= 860 MPa",
    "Biocompatibilidade comprovada após passivação ASTM F86"
  ]
}
```

### Modelo de Ficha de Material (`js/material-data.js`)
```javascript
{
  id: "ti_f136",
  name: "Titânio de grau de implante (Ti-6Al-4V ELI)",
  standard_code: "ASTM F136",
  category: "metal",
  composition: "Ti 89-91%, Al 5,5-6,5%, V 3,5-4,5%, Fe <= 0,25%, C <= 0,08%, O <= 0,13%",
  biocompatibility: "Biocompatibilidade excecional, osteointegração, amagnético",
  nickel_release: "Nula (< 0,01 ug/cm2/semana)",
  autoclave_safe: true,
  initial_piercing_approved: true
}
```

---

## Lógica Clínica de Avaliação da Biocompatibilidade

1. **Requisitos para Perfuração Inicial**:
   - A perfuração inicial constitui uma ferida epitelial aberta ativa.
   - A joalharia de primeira colocação deve ser biologicamente inerte, quimicamente estável, resistente à corrosão e compatível com esterilização a vapor sem libertação de vapores perigosos.
   - Os materiais certificados abrangem o Titânio ASTM F136, o Aço de implante ASTM F138, o Titânio ISO 5832-3 e o polímero BioFlex certificado de acordo com a USP Classe VI.
   - Os aços industriais comuns (316L sem refusão certificada) e ligas de titânio comerciais (Ti-64 genérico ou G23 sem documento ASTM F136) são sinalizados com aviso de precaução devido à presença potencial de impurezas de ferro e oxigénio intersticial.

2. **Restrições de Libertação de Níquel**:
   - De acordo com a entrada 27 do anexo XVII do regulamento europeu REACH, a taxa de libertação de níquel em objetos introduzidos em orifícios do corpo durante a cicatrização não pode exceder 0,2 µg/cm²/semana.
   - As especificações de implantes cirúrgicos (ASTM F138, ISO 5832-1) obrigam a processos de refusão a vácuo (VIM-VAR), fixando o níquel na matriz austenítica e prevenindo a sua lixiviação iónica.

---

## Motor de Internacionalização (I18N)

- **Idiomas Integrados**: Inglês (`en`), Francês (`fr`), Alemão (`de`), Italiano (`it`), Espanhol (`es`), Português (`pt`) e Neerlandês (`nl`).
- **Arquitetura da Solução**:
  - `window.i18n`: Gestor global em `js/i18n.js`.
  - Ficheiros específicos em `js/i18n/*.js` registam cada dicionário no carregamento.
  - Ligação ao DOM através dos atributos `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria-label` e `data-i18n-title`.
  - Atualização por eventos: A emissão do evento `languageChanged` desencadeia a renovação instantânea dos componentes com geração dinâmica de interface.
- **Paridade Comprovada**: O comando de teste `audit_i18n.cjs` certifica que as 951 chaves de tradução se encontram exatamente alinhadas em todos os 7 idiomas.

---

## Acessibilidade, Design Responsivo e Motor de Impressão

- **Acessibilidade (WCAG 2.1 AA)**:
  - Rácio de contraste superior a 4,5:1 para o texto em ambos os modos visual (claro e escuro).
  - Alvos de clique táteis com dimensão mínima de 44x44px.
  - Navegabilidade integral por teclado com anel de foco bem delineado.
  - Aplicação exaustiva de propriedades ARIA em abas de navegação, caixas de diálogo modais e painéis desdobráveis.
- **Design Responsivo**:
  - Adaptação fluida combinando CSS Grid e Flexbox com transição impecável desde telemóveis de 360px até ecrãs 4K.
  - Apresentação em formato de blocos empilhados para tabelas em ecrãs móveis.
- **Impressão Direcionada**:
  - Regras `@media print` isolam o documento de análise ou questionário em foco.
  - Supressão de barras de navegação, campos de digitação e botões de comando.
  - Tipografia de alto contraste em preto e branco para arquivo físico e envio postal a distribuidores.

---

## Verificação Automatizada e Controlo de Qualidade

O projeto incorpora uma rotina completa de testes automáticos:
- `node audit_i18n.cjs`: Confere contagem de chaves, substituição de variáveis e correção ortográfica de pontuação.
- `node verify_all_constraints.cjs`: Monitoriza o limite de tamanho (< 512 KiB por ficheiro), o bloqueio total de CDNs externas, a integridade de ficheiros de imagem e a consistência das diretrizes clínicas.
- `npm run lint`: Verificação de código TypeScript sem erros.
- `npm run build`: Validação do empacotamento para lançamento em produção.
