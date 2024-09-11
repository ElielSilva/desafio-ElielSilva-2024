import { especies } from "./especies-zoo";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        if(!especies[animal]) {
            return {erro: "Animal inválido"}
        }
        if(quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }
    }
}

export { RecintosZoo as RecintosZoo };
