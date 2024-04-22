const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100, vidaMaxima: 100 },      
            vidaAntesDoAtaqueHeroi: null,
            vidaAntesDoAtaqueVilao: null,
            heroiAcao: "Placeholder Imagem",
            vilaoAcao: "Placeholder Imagem"
        }
    },
    methods: {
        atacar(isHeroi) {
            if (isHeroi) {
                console.log("Herói atacou")
                this.heroiAcao = "O Herói atacou"
                this.vidaAntesDoAtaqueHeroi = this.heroi.vida;
                this.vilao.vida = Math.max(0, Math.min(this.vilao.vidaMaxima, this.vilao.vida - 10));
                this.acaoVilao();
            } else {
                console.log("Vilão atacou")
                this.vilaoAcao = "O Vilão Atacou"
                this.vidaAntesDoAtaqueVilao = this.heroi.vida; 
                this.heroi.vida = Math.max(0, Math.min(100, this.heroi.vida - 10)); 
                this.acaoVilao();
            }
        },
        defender(isHeroi) {
            if (isHeroi) {
                console.log("Herói defendeu")
                this.heroiAcao = "O Herói defendeu"
                if (this.vidaAntesDoAtaqueVilao !== null) {
                    this.heroi.vida = this.vidaAntesDoAtaqueVilao;
                    this.vidaAntesDoAtaqueVilao = null;
                }
            } else {
                console.log("Vilão defendeu")
                this.vilaoAcao = "O Vilão Defendeu"
                if (this.vidaAntesDoAtaqueHeroi !== null) {
                    this.vilao.vida = this.vidaAntesDoAtaqueHeroi;
                    this.vidaAntesDoAtaqueHeroi = null; 
                }
            }
        },
        usarPocao(isHeroi) {
            if (isHeroi){
                if(this.heroi.vida <= 80){
                    console.log("Herói usou poção");
                    this.heroiAcao = "O Herói usou poção"
                    this.heroi.vida = Math.max(0, Math.min(100, this.heroi.vida + 20));
                } else {
                    console.log("Vilão usou poção");
                    this.vilaoAcao = "O Vilão usou poção"
                    this.vilao.vida = Math.max(0, Math.min(100, this.vilao.vida + 20));
                }
            }
        },
        correr(isHeroi) {
            if (isHeroi) {
                console.log("Herói Correu");
                this.heroiAcao = "O Herói Correu"
                this.heroi.vida = 0;
            } else {
                console.log("Vilão Correu");
                this.vilaoAcao = "O Vilão Correu"
                this.vilao.vida = 0;
                
            }
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'usarPocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        },
        barraVidaClass(vida) {
            if (vida <= 20) {
                return 'low';
            } else if (vida <= 50) {
                return 'medium';
            } else {
                return 'high';
            }
        }
        
    }
}).mount("#app");
