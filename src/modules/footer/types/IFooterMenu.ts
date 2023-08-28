export interface IFooterMenu {
  id: number,
  title: string,
  url: string,
}

export interface IFooterMenus {
  title: string,
  menus: IFooterMenu[],
}