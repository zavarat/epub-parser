import { isExists } from '../util/typecheck';
import Item from './Item';
import mergeObjects from '../util/mergeObjects';

class CssItem extends Item {
  constructor(rawObj = {}) {
    super(rawObj);
    if (isExists(rawObj.namespace)) {
      this.namespace = rawObj.namespace;
    }
    if (this.constructor === CssItem) {
      Object.freeze(this);
    }
  }

  toRaw() {
    return mergeObjects(super.toRaw(), {
      namespace: this.namespace,
      itemType: CssItem.name,
    });
  }
}

export default CssItem;
