class Logger {
  static info(obj: any) {
    console.log('​logger -> info', obj);
  }

  static error(error: any, errorCode?: string) {
    console.log('​logger -> error', error, errorCode);
  }

  static order(order: any, account: any, pairList: any) {
    console.log('​logger -> info', order, account, pairList);
  }
}

export default Logger;
