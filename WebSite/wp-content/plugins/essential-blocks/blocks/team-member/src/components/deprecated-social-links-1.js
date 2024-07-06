const { sanitizeURL } = window.EBControls;
export default function SocialLinksDeprecated1({
    socialDetails = [],
    icnEffect,
}) {
    return (
        <ul className="socials">
            {socialDetails.map(({ link, icon }, index) => (
                <li key={index}>
                    <a className={icnEffect || " "} href={sanitizeURL(link)}>
                        <i className={`hvr-icon social-icon ${icon}`}></i>
                    </a>
                </li>
            ))}
        </ul>
    );
}
