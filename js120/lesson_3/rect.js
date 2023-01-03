let RECTANGLE = {
    area: function(width, height) {
      return width * height;
    },
    perimeter: function(width, height) {
      return 2 * (width + height);
    }
  };
  
  function Rectangle(width, height) {
    this.width = width;
    this.height = height;
    this.area = RECTANGLE.area(height, width);
    this.perimeter = RECTANGLE.perimeter(height, width);
  }
  
  let rect1 = new Rectangle(2, 3);
  console.log(rect1.area);      // => 6
  console.log(rect1.perimeter); // => 10