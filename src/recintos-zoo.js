import { especies } from "./especies-zoo";
import { recintosBase } from "./recintos-base-zoo";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const resulatadoValidacao = this.validarParametros(animal,quantidade);
        if (resulatadoValidacao.resultadoErro) {
            return resulatadoValidacao.dados;
        }

        const resultado = this.validarExistenciaDeVagas(animal,quantidade);
        
        if (resultado.resultadoErro) {
            return { erro: "Não há recinto viável"}
        }
        // console.log(this.gerarListaDeRecintosDisponiveis(resultado.dados, animal,quantidade))
        return {
            recintosViaveis: this.gerarListaDeRecintosDisponiveis(resultado.dados, animal, quantidade)
        }

    }
     
    validarParametros(animal, quantidade) {
        if (!especies[animal]) {
            return {
            resultadoErro: true,
            dados:{
                    erro: "Animal inválido"
            }
            }
        };
        
        if(quantidade <= 0) {
            return {
            resultadoErro: true,
            dados:{
                erro: "Quantidade inválida"
            }
            }
        };
    
        return {resultadoErro: false}
    }

    validarExistenciaDeVagas(animal,quantidade) {
        const resultado = especies[animal].biomas.filter((bioma) => {
            if (animal == "MACACO" && quantidade == 1 && recintosBase.numero[bioma].animais.length == 0) {
                return false
            }
            if (animal == "HIPOPOTAMO" && recintosBase.numero[bioma].bioma != 'savana e rio' && recintosBase.numero[bioma].animais.length != 0) {
                return false
            }
            const quantidadeOcupadaEspecieEntrada = especies[animal].tamanho * quantidade
            const result = recintosBase.numero[bioma].animais.reduce((arr, curr) => {
                 if (especies[animal].carnivoros != especies[curr].carnivoros) {
                     arr.especiesDiferentes = true
                 }
                 arr.total = arr.total + especies[curr].tamanho;
                 return arr
            }, {especiesDiferentes: false , total: 0})

            if (quantidadeOcupadaEspecieEntrada > (recintosBase.numero[bioma].tamanhoTotal - result.total)) {
                 return false
            }
            if (result.especiesDiferentes) {
                return false
            }
            return true
        });
        return {
            resultadoErro: !resultado.length,
            dados: resultado
        }
    }

    gerarListaDeRecintosDisponiveis(listaDeRecintos, animal, quantidade) {
        return listaDeRecintos.map((recinto) => {
            let espacoExtra = 0
            const espacoTotal = recintosBase.numero[recinto].tamanhoTotal
            const espacoOcupado = recintosBase.numero[recinto].animais.reduce((arr, curr) => {
                if (animal != curr) {
                    espacoExtra = 1
                }
                return arr + especies[curr].tamanho;
            }, 0)
            const espacoAnimal = especies[animal].tamanho * quantidade;
            // console.log(espacoAnimal, espacoOcupado, espacoExtra,espacoTotal)
            return `Recinto ${recinto} (espaço livre: ${espacoTotal - (espacoOcupado + espacoAnimal + espacoExtra)} total: ${espacoTotal})`
        });
    }
}

export { RecintosZoo as RecintosZoo };
