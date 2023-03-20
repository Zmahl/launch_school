function myBind(func, context, ...args) {
  return function(...additionalArgs) {
    allArgs = args.concat(additionalArgs);
    func.apply(context, ...allArgs);
  }
}

