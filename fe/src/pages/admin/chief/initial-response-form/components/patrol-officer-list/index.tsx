import { useEffect, useState } from 'react';
import { userApi } from '@/api/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { UserResponse } from '@/types/user.interface';
import { ChevronsUpDown } from 'lucide-react';
import { caseUserApi } from '@/api/case-user';
import type { CaseUsersResponse } from '@/types/user-case.interface';

type Props = {
  case_id  : string
}

const Index = ( { case_id }: Props ) => {
  const [showOfficerDialog, setShowOfficerDialog] = useState(false);
  const [selectedOfficers, setSelectedOfficers] = useState<string[]>([]);
  const [openCmbOfficerStatus, setOpenCmbOfficerStatus] = useState(false);
  const [valueOfficerStatus, setValueOfficerStatus] = useState('');
  const [openCmbZone, setOpenCmbZone] = useState(false);
  const [valueZone, setValueZone] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [officers, setOfficers] = useState<CaseUsersResponse[]>([]);


  useEffect(() => {
    getAllUsers()
    getCaseUsers();
  }, [case_id]);

  const filteredUsers = users.filter((officer) => {
    const matchesSearch = officer.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = valueOfficerStatus ? officer.present_status === valueOfficerStatus : true;
    const matchesZone = valueZone ? officer.zone === valueZone : true;
    return matchesSearch && matchesStatus && matchesZone;
  });

  const handleAddOfficer = async () => {
    const selected = filteredUsers.filter((user) =>
      selectedOfficers.includes(user.user_name)
    );

    const caseUsersPayload = selected.map((user) => ({
      case_id: case_id,
      user_name: user.user_name,
    }));

    try {
      await caseUserApi.createCaseUser(caseUsersPayload);
      getCaseUsers()
    } catch (err) {
      console.error('Failed to add officers to case:', err);
    }
    setSelectedOfficers([]);
    setShowOfficerDialog(false);
  };

  const getCaseUsers = async () => {
    try {
      const caseUsers = await caseUserApi.getUsersByCaseId(case_id)
      setOfficers(caseUsers.data)
    } catch (error) {
      throw error
    }
  }

    const getAllUsers = async () => {
    try {
      const response = await userApi.getAllUsers();
      setUsers(response.data.result);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };



  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <label className="font-semibold">LIST OF OFFICERS ASSIGNED TO THE SCENE</label>
          <Dialog open={showOfficerDialog} onOpenChange={setShowOfficerDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-100 p-4" variant="outline" size="sm" onClick={getAllUsers}>VIEW</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[70%] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-blue-100 p-3 rounded text-center">
                  ADD PATROL OFFICER TO SCENE
                </DialogTitle>
              </DialogHeader>
              <div>
                <Input
                  type="text"
                  placeholder="Search officers..."
                  className="w-full mb-4"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <Popover open={openCmbOfficerStatus} onOpenChange={setOpenCmbOfficerStatus}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-45 justify-between">
                        {valueOfficerStatus || 'Present Status'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-45 p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem
                              key="all-status"
                              value="all-status"
                              onSelect={() => {
                                setValueOfficerStatus('');
                                setOpenCmbOfficerStatus(false);
                              }}
                            >
                              <Checkbox checked={valueOfficerStatus === ''} className="mr-2" /> All
                            </CommandItem>
                            {[...new Set(users.map((u) => u.present_status))].map((status) => (
                              <CommandItem
                                key={status}
                                value={status}
                                onSelect={() => {
                                  setValueOfficerStatus(status);
                                  setOpenCmbOfficerStatus(false);
                                }}
                              >
                                <Checkbox checked={valueOfficerStatus === status} className="mr-2" />
                                {status}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Popover open={openCmbZone} onOpenChange={setOpenCmbZone}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" className="w-35 justify-between">
                        {valueZone || 'Zone'}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-35 p-0">
                      <Command>
                        <CommandList>
                          <CommandGroup>
                            <CommandItem
                              key="all-zone"
                              value="all-zone"
                              onSelect={() => {
                                setValueZone('');
                                setOpenCmbZone(false);
                              }}
                            >
                              <Checkbox checked={valueZone === ''} className="mr-2" /> All
                            </CommandItem>
                            {[...new Set(users.map((u) => u.zone))].map((zone) => (
                              <CommandItem
                                key={zone}
                                value={zone}
                                onSelect={() => {
                                  setValueZone(zone);
                                  setOpenCmbZone(false);
                                }}
                              >
                                <Checkbox checked={valueZone === zone} className="mr-2" />
                                {zone}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end my-4">
                <Button
                  onClick={handleAddOfficer}
                  className="bg-blue-500 text-white hover:bg-blue-700 w-50"
                  disabled={selectedOfficers.length === 0}
                >
                  Add Selected Officers
                </Button>
              </div>
              <Table className="w-full text-sm border">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="p-2 border">ID</TableHead>
                    <TableHead className="p-2 border text-center">Select</TableHead>
                    <TableHead className="p-2 border">Full Name</TableHead>
                    <TableHead className="p-2 border">Present Status</TableHead>
                    <TableHead className="p-2 border">Role</TableHead>
                    <TableHead className="p-2 border">Phone Number</TableHead>
                    <TableHead className="p-2 border">Zone</TableHead>
                  </TableRow>
                </TableHeader>
               <TableBody>
                    {filteredUsers.map((officer) => {
                      const isAlreadyAssigned = officers.some(o => o.user_name === officer.user_name);

                      return (
                        <TableRow key={officer.user_name}>
                          <TableCell className="p-2 border">{officer.user_name}</TableCell>
                          <TableCell className="p-2 border text-center">
                            <Checkbox
                              checked={selectedOfficers.includes(officer.user_name)}
                              disabled={isAlreadyAssigned}
                              onCheckedChange={(checked) => {
                                if (isAlreadyAssigned) return;
                                setSelectedOfficers((prev) =>
                                  checked
                                    ? [...prev, officer.user_name]
                                    : prev.filter((id) => id !== officer.user_name)
                                );
                              }}
                            />
                          </TableCell>
                          <TableCell className="p-2 border">{officer.full_name}</TableCell>
                          <TableCell className="p-2 border">
                            <Badge
                              className={`text-white ${
                                officer.present_status.toLowerCase() === 'idle' ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                            >
                              {officer.present_status}
                            </Badge>
                          </TableCell>
                          <TableCell className="p-2 border">{officer.role?.description}</TableCell>
                          <TableCell className="p-2 border">{officer.phone_number}</TableCell>
                          <TableCell className="p-2 border">{officer.zone}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>

              </Table>
            </DialogContent>
          </Dialog>
        </div>

        <Table className="w-full text-sm border">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="p-4">Full Name</TableHead>
              <TableHead className="p-4">Role</TableHead>
              <TableHead className="p-4">Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {officers.map((officer) => (
              <TableRow key={officer.user_name}>
                <TableCell className="p-4">{officer?.full_name}</TableCell>
                <TableCell className="p-4">{officer?.description}</TableCell>
                <TableCell className="p-4">{officer?.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Index;
