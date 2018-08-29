import * as React from "react";
import { IListing } from "../IListing";
import { getStyles, IListingTileStyles } from "./ListingTile.styles";
import { getClassNames, IListingTileClassNames } from "./ListingTile.classNames";
import { Image } from "office-ui-fabric-react/lib/components/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { css } from "@uifabric/utilities/lib";
import { ListingBookmarkButton } from "./ListingBookmarkButton";
import { ListingBookmarkListStore } from "../model/ListingBookmarkListStore";
import { ListingOpenAction } from "./ListingActions";
import { UserAuthContainer } from "../../user/component/UserAuthContainer";
import { canUserAccess } from "../ListingHelper";
import { UserProfile } from "../../user/component/UserProfile";
import { IUserProfile } from "../../user/IUserProfile";
import { UserAdminContext } from "../../user/UserAdminContext";

interface IListingTileProps {
    listing: IListing;
    onClick?: (listing : IListing) => void;
    className?: string;
    styles?: IListingTileStyles;
    onOpen?: (listing : IListing) => void;
}

class ListingTile extends React.Component<IListingTileProps, any> {
    private _classNames : IListingTileClassNames;
    private _onClick = () => {
        this.props.onClick(this.props.listing);
    }
    private _renderTop() : React.ReactNode {
        return (
            <div className={css(this._classNames.top, "opacity-hover")}></div>
        );
    }
    private _renderBanner() : React.ReactNode {
        const listingBannerIcon = this.props.listing.banner_icon;
        let banner;
        let bannerIsIcon = false;
        if(listingBannerIcon && listingBannerIcon.url) {
            banner = <Image width={220} height={137} src={listingBannerIcon.url} alt={this.props.listing.title} />;
        } else {
            bannerIsIcon = true;
            banner = <Icon iconName="Puzzle" className="banner-icon" title={this.props.listing.title} />
        }
        return (
            <div className={css(this._classNames.banner, { "is-icon": bannerIsIcon })}>
                {banner}
            </div>
        );
    }
    private _renderTitle() : React.ReactNode {
        return (
            <h3 className={this._classNames.title}>
                {this.props.listing.title}
            </h3>
        )
    }
    private _renderShortDescription() : React.ReactNode {
        return (
            <h5 className={this._classNames.shortDescription}>
                {this.props.listing.description_short}
            </h5>
        )
    }
    private _renderContent() : React.ReactNode {
        return (
            <div className={this._classNames.content}>
                {this._renderTitle()}
                {this._renderShortDescription()}
            </div>
        );
    }
    private _canUserAccess = (userProfile : IUserProfile) => {
        return UserAdminContext.value(userProfile) || canUserAccess(this.props.listing, userProfile);
    }
    private _renderFooter() : React.ReactNode {
        return (
            <UserAuthContainer isAuthorised={this._canUserAccess}>
                <div className={this._classNames.footer}>
                    <ListingBookmarkButton bookmarkList={ListingBookmarkListStore} listing={this.props.listing} />
                    <ListingOpenAction {...this.props} />
                </div>
            </UserAuthContainer>
        );
    }
    render() {
        this._classNames = getClassNames(getStyles(null, this.props.styles), this.props.className, this.props.onClick ? true : false);
        return (
            <div className={this._classNames.root}
                 role={this.props.onClick ? "button" : undefined}
                 onClick={this.props.onClick ? this._onClick : undefined}
                 title={this.props.listing.description_short}>
                {this._renderTop()}
                {this._renderBanner()}
                {this._renderContent()}
                {this._renderFooter()}
            </div>
        );
    }
}

export { IListingTileProps, ListingTile }