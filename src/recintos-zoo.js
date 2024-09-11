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
}

export { RecintosZoo as RecintosZoo };
