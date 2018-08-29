import * as React from "react";
import { observer } from "mobx-react";
import { IListingListContainerProps, ListingListContainer } from "./ListingList";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IListingListPageStyles, getStyles } from "./ListingListPage.styles";
import { getClassNames } from "./ListingListPage.classNames";
import { ListingTile } from "./ListingTile";
import { IListing } from "../IListing";
import { ListingViewConfig } from "./ListingViewConfig";

interface IListingListPageProps extends IListingListContainerProps {
    styles?: IListingListPageStyles;
    className?: string;
    onOpen?: (listing : IListing) => void;
}

@observer
class ListingListSearchInput extends React.Component<IListingListPageProps, any> {
    private _onSearchChange = (newValue : any) => {
        this.props.listings.setSearchText(newValue);
    } 
    render() {
        const classNames = getClassNames(getStyles(null, this.props.styles), this.props.className); 
        return (
            <div className={classNames.input}>
                <SearchBox value={this.props.listings.searchText} placeholder={`Search ${ListingViewConfig.labelPlural}`} onChange={this._onSearchChange} />
            </div>
        );
    }
}

class ListingListPage extends React.Component<IListingListPageProps, any> {
    private _onRenderItem = (listing, idx, props) => {
        return <ListingTile key={listing.id}
                            listing={listing}
                            onClick={props.onSelectItem}
                            onOpen={this.props.onOpen} />;
    }
    render() {
        const classNames = getClassNames(getStyles(undefined, this.props.styles), this.props.className); 
        return (
            <div className={classNames.root}>
                <ListingListSearchInput {...this.props} />
                <div className={classNames.results}>
                    <ListingListContainer {...this.props} onRenderListing={this._onRenderItem} />
                </div>
            </div>
        );
    }
}

export { IListingListPageProps, ListingListPage }

