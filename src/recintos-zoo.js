class RecintosZoo {

  constructor() {
      this.recintos = [
          { nome: "Recinto 1", bioma: "savana", totalEspaco: 10, espacoLivre: 7, animaisPresentes: ["MACACO"] },
          { nome: "Recinto 2", bioma: "floresta", totalEspaco: 5, espacoLivre: 5, animaisPresentes: [] },
          { nome: "Recinto 3", bioma: "savana e rio", totalEspaco: 7, espacoLivre: 5, animaisPresentes: ["GAZELA"] },
          { nome: "Recinto 4", bioma: "rio", totalEspaco: 8, espacoLivre: 8, animaisPresentes: [] },
          { nome: "Recinto 5", bioma: "savana", totalEspaco: 9, espacoLivre: 6, animaisPresentes: ["LEAO"] },
      ];

      this.animais = [
          { especie: "LEAO", tamanho: 3, biomas: ["savana"], carnivoro: true },
          { especie: "LEOPARDO", tamanho: 2, biomas: ["savana"], carnivoro: true },
          { especie: "CROCODILO", tamanho: 3, biomas: ["rio"], carnivoro: true },
          { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
          { especie: "GAZELA", tamanho: 2, biomas: ["savana"], carnivoro: false },
          { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
      ];
  }

  #formatViableRecints(name, freeSpace, totalSpace) {
    return `${name} (espaço livre: ${freeSpace} total: ${totalSpace})`
    
  }

  #getAnimalInfo(animal, quantidade) {
      const animalInfo = this.animais.find(a => a.especie === animal);

      if (quantidade <= 0) return { erro: "Quantidade inválida" };

      if (!animalInfo) return { erro: "Animal inválido" };

      return animalInfo;
  }

  #hasCarnivore(recinto) {
      return recinto.animaisPresentes.some(animalNoRecinto => {
          const dadosAnimal = this.animais.find(a => a.especie === animalNoRecinto);
          return dadosAnimal.carnivoro;
      });
  }

  #getViableRecints(animalInfo, animal, quantidade) {
      let viableRecints = [];
      let necessarySpace = animalInfo.tamanho * quantidade;

      for (const recinto of this.recintos) {
          const sameEspecieInRecint = recinto.animaisPresentes.includes(animal);
          let extraSpace = 0;

          const recintBiomes = recinto.bioma.split(" e ");
          const compatibleRecints = animalInfo.biomas.some(bioma => recintBiomes.includes(bioma));
          
          if (!animalInfo.carnivoro && this.#hasCarnivore(recinto)) {
            continue;
          }

          if (!compatibleRecints) continue;

          if (recinto.animaisPresentes.length > 0 && !sameEspecieInRecint) {
            extraSpace = 1;
          }

          if (animalInfo.carnivoro && (recinto.animaisPresentes.length > 0 && !sameEspecieInRecint)) {
              continue;
          }
          
          const totalNecessarySpace = necessarySpace + extraSpace;

          if (recinto.espacoLivre >= necessarySpace) {
              viableRecints.push(this.#formatViableRecints(recinto.nome, recinto.espacoLivre - totalNecessarySpace, recinto.totalEspaco));
          }
      }

      return viableRecints;
  }

  analisaRecintos(animal, quantidade) {
      const animalInfo = this.#getAnimalInfo(animal, quantidade);

      if (animalInfo.erro) return animalInfo;

      const viableRecints = this.#getViableRecints(animalInfo, animal, quantidade);

      if (viableRecints.length === 0) return { erro: "Não há recinto viável" };

      return {
          recintosViaveis: viableRecints
      };
  }

}

export { RecintosZoo as RecintosZoo };