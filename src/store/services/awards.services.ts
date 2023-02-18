import { store, Store } from "../setup";
import { Award } from "../models";

class AwardsService {
  constructor(private store: Store) {}

  add(award: Omit<Award, "id">): Award {
    const newId = this.getNewId();
    const newAward = { id: newId, ...award };
    this.store.setValue((value) => {
      return { ...value, awards: [...value.awards, newAward] };
    });
    return newAward;
  }

  delete(id: number): void {
    this.store.setValue((value) => ({
      ...value,
      awards: value.awards.filter((award) => award.id !== id),
    }));
  }

  changeIndex(id: number, index: number): number {
    let newIndex = index;
    this.store.setValue((value) => {
      const newAwards = [...value.awards];
      const indexEl = value.awards[index];
      const awardIndex = value.awards.findIndex((award) => award.id === id);
      if (!indexEl || awardIndex < 0) {
        newIndex = awardIndex;
        return value;
      }
      newAwards[index] = value.awards[awardIndex];
      newAwards[awardIndex] = indexEl;
      return { ...value, awards: newAwards };
    });
    return newIndex;
  }

  private getNewId() {
    const awardIds = this.store.getValue().awards.map((award) => award.id);
    let newId = 1;
    while (awardIds.includes(newId)) {
      newId++;
    }
    return newId;
  }
}

const awardsService = new AwardsService(store);

export default awardsService;
