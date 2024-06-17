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

core.updatePage(session_details.session_id, <current_page_name>)

### Register a made purchase

Add this function to an onclick listener for when a user completes a transaction

core.targetReached(session_details.session_id)

### Register an action item click

This function is to be used when a user clicks on one of the recommended actions items

core.registerClick(session_details.session_id, <recommended_action_item_name>)




