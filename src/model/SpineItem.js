import { isExists } from '../util/typecheck';
import Item from './Item';
import mergeObjects from '../util/mergeObjects';

const privateProps = new WeakMap();

const unknownIndex = -1;

class SpineItem extends Item {
  get styles() {
    const props = privateProps.get(this);
    if (!isExists(props)) {
      return undefined;
    }
    const { findItem, styles } = props;
    if (!isExists(findItem) || !isExists(styles)) {
      return undefined;
    }
    return styles.map(style => findItem(style));
  }

  constructor(rawObj = {}) {
    super(rawObj);
    this.spineIndex = isExists(rawObj.spineIndex) ? rawObj.spineIndex : unknownIndex;
    this.isLinear = isExists(rawObj.isLinear) ? rawObj.isLinear : true;
    if (isExists(rawObj.styles)) {
      privateProps.set(this, { findItem: rawObj.findItem, styles: rawObj.styles });
    }
    Object.freeze(this);
  }

  toRaw() {
    const props = privateProps.get(this);
    let styles;
    if (isExists(props)) {
      styles = props.styles; // eslint-disable-line prefer-destructuring
    }
    return mergeObjects(super.toRaw(), {
      spineIndex: this.spineIndex,
      isLinear: this.isLinear,
      styles,
      itemType: SpineItem.name,
    });
  }
}

SpineItem.UNKNOWN_INDEX = unknownIndex;

export default SpineItem;
