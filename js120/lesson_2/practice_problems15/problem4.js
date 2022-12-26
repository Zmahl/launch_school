const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;
    self.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
console.log();


TESgames.listGames = function() {
  this.titles.forEach(function(title) {
    console.log(this.seriesTitle + ': ' + title);
  }, this);
}

TESgames.listGames();

console.log();
TESgames.listGames = function() {
    //forEach / other callback functions allow a way to provide context using "this"
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ': ' + title);
    });
};

TESgames.listGames();