#!/usr/bin/env python

print("Updating NetSuite Deploy sandbox URL to top-level domain")
filename = "node_modules/netsuite-deploy/lib/rest.js"
backup_filename = str(filename + ".bak")

# change line 5 to be:
sandbox_line = "  sandbox: 'https://rest.netsuite.com/rest/roles',\n"

with open(filename, 'r') as in_file:
  lines = in_file.readlines()

  with open(backup_filename, 'w') as out_file:
    out_file.writelines(lines)
  print("Backup saved to " + backup_filename)

with open(filename, 'w') as out_file:
  out_file.writelines(lines[0:5] + [sandbox_line] + lines[6:])
