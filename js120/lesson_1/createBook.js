function createBook(title, author, read = false) {
  let book = {
    title: title,
    author: author,
    read: read,

    getDescription() {
      let readIt  = this.read ? "I have read it" : "I have not read it";
      console.log(`${title} was written by ${author}. ${readIt}`);
    },

    read() {
      this.read = true;
    }
  }
  return book;
}

let book1 = createBook("Mythos", "Stephen Fry");
let book2 = createBook("Me Talk Pretty One Day", "David Sedarts");
let book3 = createBook("Aunts aren't gentlemen", "PG Wodehouse")

book1.getDescription();
