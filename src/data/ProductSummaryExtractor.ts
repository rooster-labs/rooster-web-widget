import { Account, Product } from "./Product";

export abstract class ProductSummaryExtractor {
  abstract name: string;

  abstract extractAccountDetails(): Account[];

  createProduct(): Product {
    return {
      name: this.name,
      accounts: this.extractAccountDetails(),
    };
  }

  onLoad(timeout: number = 4000) {
    setTimeout(() => {
      console.log(`${this.name} Summary Page`);
      const productData = this.createProduct();
      chrome.storage.local.set({ [this.name]: productData });
      console.log(productData);
    }, timeout);
  }
}
