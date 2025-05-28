import UserDropdownMenu from "@/components/user-dropdown-menu";
import MoreActionsDropdown from "@/components/more-actions-dropdown";

export const Header = () => {
    return (
        <div className="flex items-center justify-between p-6">
            <div className="flex items-center">
                <h1 className="text-xl font-bold hidden md:block">ChatGPT Clone</h1>
            </div>
            <div className="flex items-center space-x-4">    
                <MoreActionsDropdown />
                {/* Placeholder for future features */}  
                <UserDropdownMenu />
            </div>
        </div>
    );
};