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
