class GenericHelper {
  getItemInArrById(id, arr) {
    let item = arr.find(item => (item.id === id ? item : null));

    return item;
  }

  removeFromArr(id, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1);
        break;
      }
    }
  }

  getDate(date) {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }

  getInSourceAndNotTarget(source, target) {
    let arr = [];
    source.forEach(i => {
      if (target.indexOf(i) === -1) {
        arr.push(i);
      }
    });

    return arr;
  }
}

// helper functions:

const genericHelper = new GenericHelper();

const Helpers = {
  genericHelper
};

export default Helpers;
