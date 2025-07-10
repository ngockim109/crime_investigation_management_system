import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { GetUserFilter } from "../dto/get-reports-filter.dto";

class ParseUserFilterPipe implements PipeTransform<GetUserFilter> {
    transform(value: GetUserFilter, metadata: ArgumentMetadata) {
        if (value.currentPage == undefined) {
            value.currentPage = 1
        }
        if (value.position == undefined) {
            value.position = ""
        }
        if (value.pageSize == undefined) {
            value.pageSize = 20
        }
        if (value.full_name == undefined) {
            value.full_name = ""
        }

        return value
    }
}

export default ParseUserFilterPipe