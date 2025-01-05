export interface MenuItem {
  id: string;
  label: string;
  hasChildren: boolean;
  children?: MenuItem[];
  parentId?: string;
}

export interface MenuState {
  currentPath: string[];
  selectedItem: MenuItem | null;
}