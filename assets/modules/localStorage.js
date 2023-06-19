// create class to manage saving items with only one paremiters
export class Task {
  constructor(name) {
    this.activity = name;
    this.dataBaseName = name;
    this.dataBaseJson = "Please pull items with the 'update' method";
    this.autoIncreament = 0;
    this.item = "";
    this.items = [];
  }

  update() {
    if (localStorage.getItem(this.dataBaseName)) {
      let data = localStorage.getItem(this.dataBaseName);
      // set the data to a variable
      this.dataBaseJson = JSON.parse(data);
      this.items = this.dataBaseJson.data;
      // set the count object
      this.autoIncreament = this.dataBaseJson.totalItems;
      return true;
    }
    return false;
  }

  _updateSave() {
    this.dataBaseJson.data = this.items;
    console.log(this.items);
    this.dataBaseJson.totalItems = this.autoIncreament;
    try {
      localStorage.setItem(
        this.dataBaseName,
        JSON.stringify(this.dataBaseJson)
      );
      return true;
    } catch (error) {
      console.error(error);
    }
  }
  remove(id) {
    this.items = this.items.filter((item) => item.id != id);
    this._updateSave();
    return `items with id '${id}' removed`;
  }
  create(name) {
    try {
      this.update();
      // set the auto count and use as the new item id
      this.autoIncreament += 1;
      this.item = {
        text: String(name),
        id: this.autoIncreament,
        date: new Date().toLocaleDateString(),
      };
      this.items = [...this.items, this.item];
      this._updateSave();
      return this.item;
    } catch (error) {
      return error;
    }
  }
}
