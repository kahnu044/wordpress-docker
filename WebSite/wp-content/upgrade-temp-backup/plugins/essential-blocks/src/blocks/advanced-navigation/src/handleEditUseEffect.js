import { useState, useEffect, useRef, useMemo } from "@wordpress/element";
import { select, dispatch } from "@wordpress/data";
const { times } = lodash;
import isEqual from 'lodash/isEqual'

export const editUseEffect = ({ clientId, attributes }) => {
    const {
        layout,
        navAlign,
        dropdownOpenOnClick,
        navBtnType,
        showDropdownIcon,
        flexWrap,
        navVerticalAlign,
        hamburgerMenu
    } = attributes;

    const innerBlocks = useMemo(() => {
        const parentBlocks = select("core/block-editor").getBlocksByClientId(clientId)[0]
        return parentBlocks?.innerBlocks
    }, [clientId])
    const { updateBlockAttributes } = dispatch("core/block-editor");

    const changedAttributes = {
        layout,
        navAlign,
        flexWrap,
        navVerticalAlign,
        dropdownOpenOnClick,
        showDropdownIcon,
        navBtnType,
        hamburgerMenu
    }
    const refAttributes = useRef({ ...changedAttributes })

    useEffect(() => {
        if (!isEqual(refAttributes.current, changedAttributes)) {
            refAttributes.current = changedAttributes
            if (innerBlocks) {
                times(innerBlocks.length, (n) => {
                    updateBlockAttributes(innerBlocks[n].clientId, {
                        className: `${layout} ${layout == "is-horizontal" ? navAlign : navVerticalAlign
                            } ${flexWrap === true ? "no-wrap" : ""}`,
                        openSubmenusOnClick: dropdownOpenOnClick,
                        showSubmenuIcon: showDropdownIcon,
                        hasIcon: navBtnType,
                        overlayMenu: hamburgerMenu,
                    });
                });
            }
        }

    }, [
        { ...changedAttributes }
    ]);
}
