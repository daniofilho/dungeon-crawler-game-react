type ActionPopUpTriggeredByType = 'tile' | 'enemy' | 'player';
type triggeredBy_ElementIDType = EnemyIDType;

interface ActionPopUpType extends CoordinateType {
  isOpen: boolean;
  tile?: TileType;
  triggeredBy: ActionPopUpTriggeredByType;
  triggeredBy_ElementID: triggeredBy_ElementIDType;
}

interface showActionMenuProps extends CoordinateType {
  tile?: TileType;
  triggeredBy: ActionPopUpTriggeredByType;
  triggeredBy_ElementID: triggeredBy_ElementIDType;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

declare type UseActionsPopupContextData = {
  actionPopUp: ActionPopUpType;
  setActionPopUp: (params: ActionPopUpType) => void;

  hideActionMenu: () => void;
  showActionMenu: (props: showActionMenuProps) => void;
};
