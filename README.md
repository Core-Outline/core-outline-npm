# Core&Outline 

# Description
This package allows developers to connect to Core&Outline platform

# How to install

npm i core-outline

### Starting a new instance

var core = new CoreOutline(<access_id>, <secret_key>)

### To get the session details
var session_details = core.sessionDetails()

"""
{
    "session_id":"<session_id>",
}
"""
# Tracking user actions
### Update current page

Use this function when a user enters a page:

core.setCurrentPage(<current_page_name>, <is_terminal>)

### Register a made purchase

Add this function to an onclick listener for when a user completes a transaction

core.recordPurchase()

### Register an action item click

This function is to be used when a user clicks on one of the recommended actions items

core.recordItemClick(<recommended_action_item_name>)




