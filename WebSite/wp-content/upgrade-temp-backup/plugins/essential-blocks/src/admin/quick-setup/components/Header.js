export default function Header(props) {
    const { activeTab, menuList, templatelyPlugin, ebUserType } = props;

    let i = 0;

    return (
        <div className="eb-setup-nav-wrapper">
            <ul className="eb-setup-nav eb-flex-row-between">
                {
                    menuList.map((menu, index) => {
                        if (menu.id === "configuration" && ebUserType === "old") {
                            return null;
                        }

                        if (menu.id === "templately" && templatelyPlugin?.active) {
                            return null;
                        }

                        const isActive = menu.id === activeTab;
                        const isComplete = index < menuList.findIndex(item => item.id === activeTab);

                        return (
                            <li key={menu.id}
                                className={`eb-flex-row-center ${menu.id} ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}
                            >
                                <span className="eb-setup-count">{++i}</span>
                                <span className="eb-setup-title">{menu.label}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
